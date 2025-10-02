# PowerShell script to download sample product images
Write-Host "Downloading sample product images..." -ForegroundColor Green

# Create arrays of image URLs and filenames
$productImages = @(
    @{url="https://images.unsplash.com/photo-1546470427-e5e5c0c3d3a4?w=400&h=400&fit=crop"; file="tomatoes.jpg"},
    @{url="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop"; file="spinach.jpg"},
    @{url="https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=400&fit=crop"; file="carrots.jpg"},
    @{url="https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop"; file="bell-peppers.jpg"},
    @{url="https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop"; file="broccoli.jpg"},
    @{url="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop"; file="apples.jpg"},
    @{url="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop"; file="bananas.jpg"},
    @{url="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop"; file="strawberries.jpg"},
    @{url="https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop"; file="oranges.jpg"},
    @{url="https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop"; file="blueberries.jpg"},
    @{url="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop"; file="milk.jpg"},
    @{url="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop"; file="yogurt.jpg"},
    @{url="https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop"; file="cheese.jpg"},
    @{url="https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop"; file="eggs.jpg"},
    @{url="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop"; file="rice.jpg"},
    @{url="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop"; file="quinoa.jpg"},
    @{url="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop"; file="bread.jpg"},
    @{url="https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&h=400&fit=crop"; file="basil.jpg"},
    @{url="https://images.unsplash.com/photo-1515426954248-2df4c11837c4?w=400&h=400&fit=crop"; file="rosemary.jpg"},
    @{url="https://images.unsplash.com/photo-1583119022894-0b0c2d7e5e8a?w=400&h=400&fit=crop"; file="cilantro.jpg"},
    @{url="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop"; file="green-tea.jpg"},
    @{url="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop"; file="orange-juice.jpg"},
    @{url="https://images.unsplash.com/photo-1597318378144-e8e3e4c6e4e4?w=400&h=400&fit=crop"; file="herbal-tea.jpg"}
)

$categoryImages = @(
    @{url="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop"; file="vegetables.jpg"},
    @{url="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop"; file="fruits.jpg"},
    @{url="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop"; file="dairy.jpg"},
    @{url="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop"; file="grains.jpg"},
    @{url="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"; file="herbs.jpg"},
    @{url="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop"; file="beverages.jpg"}
)

# Download product images
Write-Host "Downloading product images..." -ForegroundColor Yellow
foreach ($image in $productImages) {
    try {
        $outputPath = "wwwroot\images\products\$($image.file)"
        Write-Host "Downloading $($image.file)..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $image.url -OutFile $outputPath -ErrorAction Stop
        Write-Host "✓ Downloaded $($image.file)" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to download $($image.file): $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Download category images
Write-Host "Downloading category images..." -ForegroundColor Yellow
foreach ($image in $categoryImages) {
    try {
        $outputPath = "wwwroot\images\categories\$($image.file)"
        Write-Host "Downloading $($image.file)..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $image.url -OutFile $outputPath -ErrorAction Stop
        Write-Host "✓ Downloaded $($image.file)" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to download $($image.file): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Sample images download completed!" -ForegroundColor Green

