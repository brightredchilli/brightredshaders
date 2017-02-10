#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    shader.load("shaders/sketch1.vert", "shaders/sketch13b-compositions.frag");
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
    ofSetColor(255);

    shader.begin();
    shader.setUniform1f("u_time", ofGetElapsedTimef());
    shader.setUniform2f("u_bounds", ofGetWidth(), ofGetHeight());
    glm::vec2 mouse = glm::vec2(ofGetMouseX(), ofGetMouseY());
    shader.setUniform2f("u_mouse", mouse);
    ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
    shader.end();

    if (needsCapture) {
        needsCapture = false;
        ofImage img = ofImage();
        img.grabScreen(0, 0 , ofGetWidth(), ofGetHeight());
        img.save("screenshot.png");
    }
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if(key == 'x') {
        needsCapture = true;
    }
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
