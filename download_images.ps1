# PowerShell script to download missing product images
param(
    [string]$BaseDir = "D:\Project_MI\Parampara_Foods\wwwroot\images\products"
)

# Ensure directory exists
if (!(Test-Path $BaseDir)) {
    New-Item -ItemType Directory -Path $BaseDir -Force
}

# Image URLs for each food item
$ImageUrls = @{
    "tomatoes" = @(
        "https://images.unsplash.com/photo-1546470427-5c4b0a0a0b0b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "spinach" = @(
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "carrots" = @(
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "bell-peppers" = @(
        "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "broccoli" = @(
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "apples" = @(
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "bananas" = @(
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "strawberries" = @(
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "oranges" = @(
        "https://images.unsplash.com/photo-1557800634-7bf3c73be389?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "blueberries" = @(
        "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "milk" = @(
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "yogurt" = @(
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "cheese" = @(
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "eggs" = @(
        "https://images.unsplash.com/photo-1518569656558-1f25e69d93d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "rice" = @(
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "quinoa" = @(
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "bread" = @(
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "basil" = @(
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "rosemary" = @(
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "cilantro" = @(
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "green-tea" = @(
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
    "orange-juice" = @(
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    )
}

Write-Host "Starting image download process..." -ForegroundColor Green
Write-Host "Target directory: $BaseDir" -ForegroundColor Yellow

$downloadedCount = 0
$failedCount = 0

foreach ($foodItem in $ImageUrls.Keys) {
    $urls = $ImageUrls[$foodItem]
    
    # Download main image (index 0)
    $mainImage = Join-Path $BaseDir "$foodItem.jpg"
    $fileExists = Test-Path $mainImage
    $fileSize = if ($fileExists) { (Get-Item $mainImage).Length } else { 0 }
    
    if (!$fileExists -or $fileSize -lt 1000) {  # Less than 1KB means corrupted
        try {
            Write-Host "Downloading main image for: $foodItem" -ForegroundColor Cyan
            Invoke-WebRequest -Uri $urls[0] -OutFile $mainImage -TimeoutSec 30
            Write-Host "✓ Downloaded: $foodItem.jpg" -ForegroundColor Green
            $downloadedCount++
        }
        catch {
            Write-Host "✗ Failed to download $foodItem.jpg : $($_.Exception.Message)" -ForegroundColor Red
            $failedCount++
        }
    }
    
    # Download additional images (index 1-4)
    for ($i = 1; $i -lt [Math]::Min(5, $urls.Length); $i++) {
        $additionalImage = Join-Path $BaseDir "$foodItem-$($i+1).jpg"
        if (!(Test-Path $additionalImage)) {
            try {
                Write-Host "Downloading additional image: $foodItem-$($i+1).jpg" -ForegroundColor Cyan
                Invoke-WebRequest -Uri $urls[$i] -OutFile $additionalImage -TimeoutSec 30
                Write-Host "✓ Downloaded: $foodItem-$($i+1).jpg" -ForegroundColor Green
                $downloadedCount++
            }
            catch {
                Write-Host "✗ Failed to download $foodItem-$($i+1).jpg : $($_.Exception.Message)" -ForegroundColor Red
                $failedCount++
            }
        }
    }
    
    # Small delay to be respectful to the server
    Start-Sleep -Milliseconds 500
}

Write-Host "`nDownload complete!" -ForegroundColor Green
Write-Host "Successfully downloaded: $downloadedCount images" -ForegroundColor Green
Write-Host "Failed downloads: $failedCount images" -ForegroundColor Red
