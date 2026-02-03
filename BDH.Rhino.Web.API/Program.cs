using BDH.Rhino.Web.API.Configuration;
using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Interfaces;
using BDH.Rhino.Web.API.Extensions;
using BDH.Rhino.Web.API.Utilities;
using BDH.Rhino.Web.Domain.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Net.Http.Headers;


internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        var cultureInfo = new CultureInfo("nl-NL");
        cultureInfo.NumberFormat.NumberDecimalSeparator = ".";
        cultureInfo.NumberFormat.CurrencyDecimalSeparator = ".";
        CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
        CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

        const string _corsPolicy = "CorsPolicy";

        builder.Services
            .AddControllers(config =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                config.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddNewtonsoftJson(a =>
            {
                a.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });


        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddHttpContextAccessor();
        builder.Services.AddScoped<UserUtility>();


        var hosts = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<List<string>>();

        // Set CORS headers, only allow certain domains.
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(_corsPolicy, p =>
            {
                p.AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins(hosts.ToArray())
                    .AllowCredentials();
            });
        });

        builder.Services.AddDbContext<BDHRhinoWebContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("BDHRhinoWebContext")));

        var auth0Config = new Auth0Configuration();
        builder.Configuration.GetSection("Auth0Configuration").Bind(auth0Config);


        builder.Services.AddAuthentication(options =>
        {
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.Authority = auth0Config.Authority;
            options.Audience = "api-generative-design";

            options.Events = new JwtBearerEvents
            {
                OnTokenValidated = async ctx =>
                {
                    // This event will be triggerd when a user authenticates in Auth0 Club Beter Bouwen tenant.
                    // The Auth0 Club Beter Bouwen tenant is also used for other portals, so not every authenticated user
                    // has automatically access to this portal.
                    // We are now going to check if the logged in user has rights.
                    if (ctx.Principal == null)
                    {
                        return;
                    }

                    var dbContext = ctx.HttpContext.RequestServices.GetRequiredService<BDHRhinoWebContext>();
                    if (dbContext == null)
                    {
                        return;
                    }

                    // Get the unique identifier from Auth0.
                    var authenticationKey = ctx.Principal.GetAuthenticationKey();

                    // Check if there is a user in our Generative Design user table with this specific key.
                    var userByAuthenticationKey = await dbContext.Users!
                        .FirstOrDefaultAsync(u => u.AuthenticationKey == authenticationKey);

                    if (userByAuthenticationKey != null)
                    {
                        // User AuthenticationKey is already added to our user table and so it is a valid user.
                        return;
                    }

                    if (ctx.HttpContext.Request.Headers.Authorization.Count != 1)
                    {
                        throw new UnauthorizedAccessException("Unauthenticated user.");
                    }
                    var authenticationHeader = ctx.HttpContext.Request.Headers.Authorization.First();
                    var authenticationHeaderSplitted = authenticationHeader.Split(" ");
                    if (authenticationHeaderSplitted.Length != 2)
                    {
                        throw new UnauthorizedAccessException("Invalid authentication method.");
                    }

                    var userEmail = await GetEmailFromAuthenticatedUserAsync(auth0Config, authenticationHeaderSplitted[0], authenticationHeaderSplitted[1]);
                    if (string.IsNullOrWhiteSpace(userEmail))
                    {
                        throw new UnauthorizedAccessException("Unknown e-mail address.");
                    }

                    // User did not have a record in our database. Check to see if we can match on e-mail.
                    // We check for users which do not have a authenticatiokey yet, and with the same e-mail.
                    // The database is case insensitive so a difference in capitals is not a problem.
                    var userByEmail = await dbContext.Users!
                        .FirstOrDefaultAsync(u => string.IsNullOrEmpty(u.AuthenticationKey)
                                               && string.Equals(u.EmailAdress, userEmail));

                    if (userByEmail != null)
                    {
                        // User found, update the user with the authentication key.
                        userByEmail.AuthenticationKey = authenticationKey;
                        await dbContext.SaveChangesAsync();
                        return;
                    }

                    // User is not known in our database. 
                    // It is a valid Club Beter Bouwen user, but does not have any rights in this Generative Design Portal.                        
                    throw new UnauthorizedAccessException("Unknown user.");
                }
            };
        });

        builder.Services.AddHttpClient();
        builder.Services.AddSingleton<IFindDataByLatLong, FindProvinceByLatLong>();
        builder.Services.AddScoped<IOverpassTurbo, OverpassTurbo>();
        builder.Services.AddSingleton<IRandomNumberGenerator, RandomNumberGenerator>();

        builder.Services.AddSolvers();
        builder.Services.AddGeometry();

        var app = builder.Build();



        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseRouting();
        app.UseHttpsRedirection();

        app.UseCors(_corsPolicy);

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();

        static async Task<string> GetEmailFromAuthenticatedUserAsync(Auth0Configuration auth0, string authenticationMethod, string token)
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(authenticationMethod, token);

            try
            {
                var user = await httpClient.GetFromJsonAsync<UserInfo>(auth0.Authority + "/userinfo");
                if (user == null)
                {
                    return string.Empty;
                }
                return user.Email;
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}

class UserInfo
{
    public string Email { get; set; } = "";
}

