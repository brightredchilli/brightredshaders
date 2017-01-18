#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outputColor;

// Plot a line on Y using a value between 0.0-1.0
float lineplot(float x, float y){
    return smoothstep(x-0.002, x, y) - smoothstep(x, x+0.002, y);
}

vec2 norm_point = gl_FragCoord.xy/u_bounds;

void main() {

    float x = norm_point.x;
    float y = norm_point.y;

    // Plot a line
    float opacity = lineplot(x, y);
    vec3 color = (1.0-opacity) * vec3(x, 1-x, 0.3) + opacity * vec3(0.0,1.0,0.0);

    outputColor = vec4(color,1.0);

}
