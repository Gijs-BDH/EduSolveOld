BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Projects]') AND [c].[name] = N'BasePolygon');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Projects] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Projects] ALTER COLUMN [BasePolygon] nvarchar(max) NOT NULL;
ALTER TABLE [Projects] ADD DEFAULT N'' FOR [BasePolygon];
GO

ALTER TABLE [OpenBouwConcepten] ADD [Stapelbaar] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230301083541_add-stapelbaar', N'6.0.7');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [UserProducts] ADD [Stapelbaar] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230301085029_check-stapelbaar', N'6.0.7');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [BuildingConceptTransformations] ADD [Verdiepingen] int NOT NULL DEFAULT 0;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230301123513_add-verdiepingen-to-transformation-entity', N'6.0.7');
GO

COMMIT;
GO

