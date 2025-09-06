# Script para criar a estrutura de pastas do projeto
$folders = @(
    "src\assets",
    "src\components\ui",
    "src\components\shared",
    "src\composables",
    "src\layouts",
    "src\services\api",
    "src\services\storage",
    "src\stores",
    "src\utils",
    "src\views\auth",
    "src\views\home",
    "src\views\lists",
    "src\views\products",
    "src\views\markets"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "Created folder: $folder"
    } else {
        Write-Host "Folder already exists: $folder"
    }
}
