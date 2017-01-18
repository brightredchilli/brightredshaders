//
//  VideoGrabber.cpp
//  bookofshaders
//
//  Created by Ying Quan Tan on 1/17/17.
//
//

#include "VideoGrabber.h"

VideoGrabber::VideoGrabber() {
    sampleRate = 44100;
    channels = 2;

    // todo: ofSetFrameRate(60);

    vidGrabber.setDesiredFrameRate(30);
    vidGrabber.initGrabber(640, 480);

    fileName = "testMovie";
    fileExt = ".mov"; // ffmpeg uses the extension to determine the container type. run 'ffmpeg -formats' to see supported formats

    // override the default codecs if you like
    // run 'ffmpeg -codecs' to find out what your implementation supports (or -formats on some older versions)
    vidRecorder.setVideoCodec("mpeg4");
    vidRecorder.setVideoBitrate("800k");
    vidRecorder.setAudioCodec("mp3");
    vidRecorder.setAudioBitrate("192k");

    //todo ofAddListener(vidRecorder.outputFileCompleteEvent, this, &ofApp::recordingComplete);

    //    soundStream.listDevices();
    //    soundStream.setDeviceID(11);

    ofSoundStreamSettings settings = ofSoundStreamSettings();
    settings.numOutputChannels = 0;
    settings.numInputChannels = 2;
    settings.sampleRate = sampleRate;
    settings.bufferSize = 256;
    settings.numBuffers = 4;
    soundStream.setup(settings);


    // todo ofSetWindowShape(vidGrabber.getWidth(), vidGrabber.getHeight()	);
    bRecording = false;
    // todo ofEnableAlphaBlending();
}

void VideoGrabber::startOrPauseRecording() {
    bRecording = !bRecording;
    if(bRecording && !vidRecorder.isInitialized()) {
        vidRecorder.setup(fileName+ofGetTimestampString()+fileExt, vidGrabber.getWidth(), vidGrabber.getHeight(), 30, sampleRate, channels);
        //          vidRecorder.setup(fileName+ofGetTimestampString()+fileExt, vidGrabber.getWidth(), vidGrabber.getHeight(), 30); // no audio
        //            vidRecorder.setup(fileName+ofGetTimestampString()+fileExt, 0,0,0, sampleRate, channels); // no video
        //          vidRecorder.setupCustomOutput(vidGrabber.getWidth(), vidGrabber.getHeight(), 30, sampleRate, channels, "-vcodec mpeg4 -b 1600k -acodec mp2 -ab 128k -f mpegts udp://localhost:1234"); // for custom ffmpeg output string (streaming, etc)

        // Start recording
        vidRecorder.start();
    }
    else if(!bRecording && vidRecorder.isInitialized()) {
        vidRecorder.setPaused(true);
    }
    else if(bRecording && vidRecorder.isInitialized()) {
        vidRecorder.setPaused(false);
    }
}

void VideoGrabber::stopRecording() {
    bRecording = false;
    vidRecorder.close();
}

void VideoGrabber::onOfUpdate() {
    vidGrabber.update();
    if(vidGrabber.isFrameNew() && bRecording) {
        bool success = vidRecorder.addFrame(vidGrabber.getPixels());
        if (!success) {
            ofLogWarning("This frame was not added!");
        }
    }
}

void VideoGrabber::onOfExit() {
    // todo: ofRemoveListener(vidRecorder.outputFileCompleteEvent, this, &ofApp::recordingComplete);
    vidRecorder.close();
}

void VideoGrabber::onOfAudioIn(float *input, int bufferSize, int nChannels) {
    if(bRecording) {
        vidRecorder.addAudioSamples(input, bufferSize, nChannels);
    }
}

