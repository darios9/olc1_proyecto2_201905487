# Script PowerShell para enviar un archivo de prueba a POST /Analyzer
# Uso: Ejecutar en PowerShell después de iniciar el backend (ver Backend/src/package.json -> npm run start)

$projectRoot = "c:\Users\dioni\OneDrive\Escritorio\Nueva carpeta\Proyecto2_2S"
$testFile = Join-Path $projectRoot "Archivos de prueba\archivo1.ci"

if (-Not (Test-Path $testFile)) {
    Write-Error "Archivo de prueba no encontrado: $testFile"
    exit 1
}

$content = Get-Content -Raw $testFile

try {
    $body = @{ code = $content } | ConvertTo-Json -Depth 5
    $response = Invoke-RestMethod -Uri http://localhost:3000/Analyzer -Method Post -ContentType 'application/json' -Body $body
    Write-Host "Respuesta recibida:`n" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 5 | Write-Host
} catch {
    Write-Error "Error al llamar al endpoint: $_"
}
