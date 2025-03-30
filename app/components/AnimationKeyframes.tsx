export const AnimationKeyframes = () => {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes expandWidth {
        from { width: 0; }
        to { width: 100%; }
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }
      @keyframes rotateGlow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes fadeInOut {
        0% { opacity: 0.2; }
        50% { opacity: 0.8; }
        100% { opacity: 0.2; }
      }
      @keyframes borderPulse {
        0% { border-color: rgba(75, 180, 255, 0.3); }
        50% { border-color: rgba(75, 180, 255, 0.7); }
        100% { border-color: rgba(75, 180, 255, 0.3); }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}} />
  );
}; 