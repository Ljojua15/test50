export interface Config {
  texts: ProgressTexts | null;
  hasBreaks: boolean;
  hasOutline: boolean;
  hasGelSymbol: boolean;
  containerColor: string;
  progressBarColor: string;
  progressBarFilledColor: string;
  sliderColor: string;
}

interface ProgressTexts {
  top: string;
  bottom: string;
}
