BEGIN TRANSACTION;
GO

ALTER TABLE [ProjectVersions] ADD [ProfitReport] nvarchar(max) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20231215102248_ProjectVersionProfitReport', N'6.0.7');
GO

COMMIT;
GO

