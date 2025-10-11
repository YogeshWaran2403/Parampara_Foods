# Simple PowerShell script to download missing images
$BaseDir = "D:\Parampara_MI\Parampara-Foods-API\wwwroot\images\products"

# Ensure directory exists
if (!(Test-Path $BaseDir)) {
    New-Item -ItemType Directory -Path $BaseDir -Force
}

Write-Host "Starting image download process..." -ForegroundColor Green
Write-Host "Target directory: $BaseDir" -ForegroundColor Yellow

# Download missing images one by one
$images = @(
    @{name="tomatoes"; url="https://images.unsplash.com/photo-1546470427-5c4b0a0a0b0b?w=800&h=600&fit=crop"},
    @{name="tomatoes-2"; url="https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=800&h=600&fit=crop"},
    @{name="tomatoes-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="tomatoes-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="spinach-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="spinach-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="spinach-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="carrots-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="carrots-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="carrots-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="bell-peppers-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="bell-peppers-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="bell-peppers-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="broccoli-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="broccoli-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="broccoli-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="apples-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="apples-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="apples-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="bananas-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="bananas-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="bananas-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="strawberries-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="strawberries-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="strawberries-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="oranges-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="oranges-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="oranges-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="blueberries-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="blueberries-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="blueberries-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="milk-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="milk-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="milk-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="yogurt-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="yogurt-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="yogurt-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="cheese-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="cheese-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="cheese-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="eggs-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="eggs-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="eggs-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="rice-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="rice-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="rice-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="quinoa-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="quinoa-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="quinoa-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="bread-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="bread-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="bread-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="basil-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="basil-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="basil-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="rosemary"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="rosemary-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="rosemary-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="rosemary-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="cilantro"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="cilantro-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="cilantro-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="cilantro-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="green-tea-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="green-tea-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="green-tea-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"},
    @{name="orange-juice-2"; url="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"},
    @{name="orange-juice-3"; url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"},
    @{name="orange-juice-4"; url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"}
)

$downloadedCount = 0
$failedCount = 0

foreach ($image in $images) {
    $filePath = Join-Path $BaseDir "$($image.name).jpg"
    
    if (!(Test-Path $filePath)) {
        try {
            Write-Host "Downloading: $($image.name).jpg" -ForegroundColor Cyan
            Invoke-WebRequest -Uri $image.url -OutFile $filePath -TimeoutSec 30
            Write-Host "Downloaded: $($image.name).jpg" -ForegroundColor Green
            $downloadedCount++
        }
        catch {
            Write-Host "Failed to download $($image.name).jpg : $($_.Exception.Message)" -ForegroundColor Red
            $failedCount++
        }
        Start-Sleep -Milliseconds 500
    }
}

Write-Host "Download complete!" -ForegroundColor Green
Write-Host "Successfully downloaded: $downloadedCount images" -ForegroundColor Green
Write-Host "Failed downloads: $failedCount images" -ForegroundColor Red
