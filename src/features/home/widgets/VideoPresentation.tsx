import Plyr from 'plyr-react';

export const VideoPresentation = () => {
  return (
    <Plyr
      source={{
        type: 'video',
        sources: [{ src: 'nGP1Q0Rp3TU', provider: 'youtube' }],
      }}
      options={{ controls: [] }}
    />
  );
};
