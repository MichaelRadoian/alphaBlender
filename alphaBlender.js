// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
	var bgX = fgPos.x;
	var bgY = fgPos.y;
	var fgX = 0;
	var fgY = 0;
    if(fgPos.x < 0){    
        bgX = 0; 
        fgX = Math.abs(fgPos.x);
    }
    if(fgPos.y < 0){
        bgY = 0; 
        fgY = Math.abs(fgPos.y);
    }

    const bgStartX = bgX;
    const fgStartX = fgX;
	var redBg=0
	var greenBg=0;
	var blueBg=0;
	var alpBg=0;
	var redFg=0;
	var greenFg=0;
	var blueFg=0;
	var alpFg=0;
	var i=0;
	var newRed=0;
	var newBlue=0;
	var newGreen=0;
	var newAlpha=0;

	//going through each pixel to alpha blend
	while(fgY < fgImg.height && bgY < bgImg.height) {
        while(fgX < fgImg.width && bgX < bgImg.width){
			//get fgImg colors
			i = fgY * (fgImg.width*4) + fgX * 4;
			redFg = fgImg.data[i];
			greenFg = fgImg.data[i+1];
			blueFg = fgImg.data[i+2];
			alpFg = fgImg.data[i+3]/255;
			
			//get bgImg colors
			i = bgY * (bgImg.width*4) + bgX * 4;
			redBg = bgImg.data[i];
			greenBg = bgImg.data[i+1];
			blueBg = bgImg.data[i+2];
			alpBg = bgImg.data[i+3]/255;
			
			//calculate new values
			newAlpha = (alpFg*fgOpac) + ((1 - (alpFg * fgOpac)) * alpBg);
			newRed = ((alpFg*fgOpac) * (redFg) + ((1 - (alpFg * fgOpac)) * (alpBg) * redBg)) / newAlpha;
			newGreen = ((alpFg*fgOpac) * (greenFg) + ((1 - (alpFg * fgOpac)) * (alpBg) * greenBg)) / newAlpha;
			newBlue = ((alpFg*fgOpac) * (blueFg) + ((1 - (alpFg * fgOpac)) * (alpBg) * blueBg)) / newAlpha;
			
			bgImg.data[i] = newRed;
			bgImg.data[i+1] = newGreen;
			bgImg.data[i+2] = newBlue;
			bgImg.data[i+3] = newAlpha*255;

			bgX= bgX+1;
			fgX= fgX+1;

		}
		bgX = bgStartX;
		fgX = fgStartX;
		bgY = bgY+1;
		fgY = fgY+1;
	}
}