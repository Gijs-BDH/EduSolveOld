using Grasshopper.Kernel.Parameters;
using Rhino.UI;


namespace BDH.Rhino.WinForm
{
    internal static class Program
    {
        public static IDisposable RhinoCore { get; set; }

        //https://github.com/mcneel/rhino/blob/e1192835cbf03f662d0cf857ee9239b84109eeed/src4/rhino4/Plug-ins/RhinoCodePlugins/RhinoCodePlugin/AssemblyInfo.cs
        static readonly Guid s_rhinoCodePluginId = new Guid("c9cba87a-23ce-4f15-a918-97645c05cde7");

        //https://github.com/mcneel/rhino/blob/8.x/src4/rhino4/Plug-ins/Commands/Properties/AssemblyInfo.cs
        static readonly Guid s_rhinoCommandsPluginId = new Guid("02bf604d-799c-4cc2-830e-8d72f21b14b7");

        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            RhinoInside.Resolver.Initialize();
            RhinoInside.Resolver.UseLatest = true;

            RhinoInside.Resolver.LoadRhino();

            RhinoCoreStartup();

            

            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            ApplicationConfiguration.Initialize();
            Application.Run(new Main());

            if (RhinoCore != null)
                RhinoCore.Dispose();
        }

        
        static void RhinoCoreStartup()
        {
            try
            {
                var args = new string[]
                {
                "/netcore"
                };
                Program.RhinoCore = new global::Rhino.Runtime.InProcess.RhinoCore(args, global::Rhino.Runtime.InProcess.WindowStyle.NoWindow);
            }
            catch (Exception ex)
            {
                var s = ex.ToString();
            }


            global::Rhino.RhinoApp.SendWriteToConsole = true;

            Environment.SetEnvironmentVariable("RHINO_TOKEN", null, EnvironmentVariableTarget.Process);
            global::Rhino.Runtime.HostUtils.OnExceptionReport += (source, ex) =>
            {
                var s = ex.ToString();
            };

            // NOTE:
            // andyopayne 11/19/2024 (RH-84777)
            // The commands.rhp needs to be loaded so that some features suchs as the gltf exporter will work.
            // This is a temporary solution until the gltf exporter is moved into Rhinocommon or Rhino.UI

            if (global::Rhino.PlugIns.PlugIn.LoadPlugIn(s_rhinoCommandsPluginId))
            {

            }
            else
            {

            }

            // NOTE:
            // eirannejad 10/02/2024 (COMPUTE-268)
            // Ensure RhinoCode plugin (Rhino plugin) is loaded. This plugin registers scripting
            // languages and starts the scripting server that communicates with rhinocode CLI. It also makes
            // the ScriptEditor and RhinoCodeLogs commands available.
            // For Rhino.Compute use cases, the ScriptEditor and rhinocode CLI are not going to be used.
            // The first time a Grasshopper definition with any scripting component on it is passed to Compute,
            // the script environments (especially python 3) will be initialized. This increases the execution
            // time on the first run on any script component. However after that the script components should run
            // normally. The scripting environment will only re-initialize when a new version of Rhino is installed.
            // eirannejad 12/3/2024 (COMPUTE-268)
            // This load is placed before Grasshopper in case GH needs to load any plugins published by the
            // new scripting tools in Rhino >= 8

            if (global::Rhino.PlugIns.PlugIn.LoadPlugIn(s_rhinoCodePluginId))
            {


                // eirannejad 12/3/2024 (COMPUTE-268)
                // now configuring scripting env to avoid using rhino progressbar and
                // dump init and package install messages to Rhino.RhinoApp.Write
                if (global::Rhino.RhinoApp.GetPlugInObject(s_rhinoCodePluginId) is object rhinoCodeController)
                {
                    ((dynamic)rhinoCodeController).SendReportsToConsole = true;
                }
            }

            // Load GH at startup so it can get initialized on the main thread
            //Log.Information("(3/4) Loading grasshopper");
            var pluginObject = global::Rhino.RhinoApp.GetPlugInObject("Grasshopper");
            var runheadless = pluginObject?.GetType().GetMethod("RunHeadless");
            if (runheadless != null)
                runheadless.Invoke(pluginObject, null);


            //Log.Information("(4/4) Loading compute plug-ins");
            var loadComputePlugins = typeof(global::Rhino.PlugIns.PlugIn).GetMethod("LoadComputeExtensionPlugins");
            if (loadComputePlugins != null)
                loadComputePlugins.Invoke(null, null);

        }              
    }
}