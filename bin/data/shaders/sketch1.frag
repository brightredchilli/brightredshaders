// fragment shader

#version 150

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outputColor;

void main()
{
    // gl_FragCoord contains the window relative coordinate for the fragment.
    // we use gl_FragCoord.x position to control the red color value.
    // we use gl_FragCoord.y position to control the green color value.
    // please note that all r, g, b, a values are between 0 and 1.

    float windowWidth = 1024.0;
    float windowHeight = 768.0;

    float thing = abs(sin(u_time));
    float r = thing + gl_FragCoord.x / u_bounds[0];
    float g = thing + gl_FragCoord.y / u_bounds[1];
    float b = u_mouse[0] / u_bounds[0];
    float a = 1.0;
    outputColor = vec4(r, g, b, a);
}
