import React from 'react';
import Toronto from './Toronto/Toronto';
import Stockholm from './Stockholm/Stockholm';
import NewYork from './NewYork/NewYork';
import Vienna from './Vienna/Vienna';
import Sydney from './Sydney/Sydney';
import London from './London/London';
import Dublin from './Dublin/Dublin';
import Moscow from './Moscow/Moscow';
import { COLOR_SCHEMES, FONT_OPTIONS, SPACING_OPTIONS } from '../../config/constants';

const TEMPLATE_COMPONENTS = {
  toronto: Toronto,
  stockholm: Stockholm,
  newyork: NewYork,
  vienna: Vienna,
  sydney: Sydney,
  london: London,
  dublin: Dublin,
  moscow: Moscow
};

export const TemplateEngine = ({ data }) => {
  if (!data) return null;

  const templateId = data.templateId || "toronto";
  const SelectedTemplate = TEMPLATE_COMPONENTS[templateId] || Toronto;

  // Resolve visual configurations
  const colorScheme = COLOR_SCHEMES.find(c => c.id === data.colorScheme) || COLOR_SCHEMES[0];
  const fontConfig = FONT_OPTIONS.find(f => f.id === data.fontId) || FONT_OPTIONS[0];
  const spacingConfig = SPACING_OPTIONS.find(s => s.id === data.spacing) || SPACING_OPTIONS[1];

  const styleVariables = {
    '--resume-primary': colorScheme.primary,
    '--resume-secondary': colorScheme.secondary,
    '--resume-accent': colorScheme.accent,
    '--resume-dark': colorScheme.dark,
    '--resume-font': fontConfig.family,
    '--resume-padding': spacingConfig.padding,
    '--resume-gap': spacingConfig.gap,
    '--resume-line-height': spacingConfig.lineHeight,
    fontFamily: fontConfig.family
  };

  return (
    <div 
      className="resume-sheet" 
      style={styleVariables}
      id="printable-resume"
    >
      <SelectedTemplate 
        data={data} 
        colors={colorScheme}
        fonts={fontConfig}
        spacing={spacingConfig}
      />
    </div>
  );
};

export default TemplateEngine;

