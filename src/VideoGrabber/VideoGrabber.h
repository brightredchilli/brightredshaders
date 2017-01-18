//
//  VideoGrabber.hpp
//  bookofshaders
//
//  Created by Ying Quan Tan on 1/17/17.
//
//

#ifndef VideoGrabber_hpp
#define VideoGrabber_hpp

#include <stdio.h>

#include "ofxVideoRecorder.h"
class VideoGrabber {
    public:
    VideoGrabber();
    private:
    ofxVideoRecorder    vidRecorder;
    ofSoundStream       soundStream;
    bool bRecording;
    int sampleRate;
    int channels;
    string fileName;
    string fileExt;

    ofFbo recordFbo;
    ofPixels recordPixels;
    ofVideoGrabber vidGrabber;

    void recordingComplete(ofxVideoRecorderOutputFileCompleteEventArgs& args);
    void startOrPauseRecording();
    void stopRecording();
    void onOfUpdate();
    void onOfExit();
    void onOfAudioIn(float *input, int bufferSize, int nChannels);
};

#endif /* VideoGrabber_hpp */
