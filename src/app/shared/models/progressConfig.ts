export interface Config {
  texts: ProgressTexts | null;
  hasOutline: boolean;
  hasGelSymbol: boolean;
  breakType: 'line' | 'dot' | '';
  containerColor: string;
  progressBarColor: string;
  progressBarFilledColor: string;
  sliderColor: string;
}

interface ProgressTexts {
  top: string;
  bottom: string;
}
