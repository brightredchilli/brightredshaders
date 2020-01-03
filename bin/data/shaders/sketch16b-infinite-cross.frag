#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_variableA;
uniform float u_variableB;

out vec4 outputColor;

#define PI 3.14159265359
#define TWO_PI (2 * PI)

vec2 st = gl_FragCoord.xy/u_bounds.xy;
float normalizer = u_bounds.x/u_bounds.y;

// origin is from bottom left
float smoothrect(in vec2 st, in vec2 origin, in vec2 size) {
    float eps = .0001;
    float left = smoothstep(origin.x - eps, origin.x + eps, st.x);
    float bottom = smoothstep(origin.y - eps, origin.y + eps, st.y);
    float right = smoothstep(origin.x + size.x - eps, origin.x + size.x + eps, st.x) * -1. + 1.;
    float top = smoothstep(origin.y + size.y - eps, origin.y + size.y + eps, st.y) * -1. + 1.;
    return left * bottom * right * top;
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float gain(float x, float k) {
    float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
    return (x<0.5)?a:1.0-a;
}

void main() {

    // this line normalizes the x, if it is larger than y.
    st.x *= normalizer;

    vec3 color = vec3(0.);

    float time = u_time / 2.; // u_time takes x seconds to reach 1.0
    float start_offset = 0.010025; // magic number: the offset from the start to get the right zoom
    time = fract(time);
    time = pow(time, 2.4); // magic number: need to speed up time at the start for animation to look right
    time += start_offset;

    float max_scale = 100.; // determines the granularity of the 'x's at the end of the cycle
    float scale = time * max_scale;
    st *= scale;

    // Offset so that after the fract call, there will be a 1.0, 1.0
    // block centered exactly in the middle of the screen
    vec2 trueBounds = vec2(normalizer, 1.0) * scale;
    st -= trueBounds / 2. - .5;

    vec2 original_st = st;

    st = fract(st);
    st -= .5; // offset to the center


    /// Draw all the small crosses
    vec2 origin = vec2(-.5, -.2);
    vec2 size = vec2(1., .4);
    color = mix(color, vec3(1.), smoothrect(st, origin, size));
    color = mix(color, vec3(1.), smoothrect(st, origin.yx, size.yx));

    /// Draw the big cross mask thatacts as the 'main cross'
    vec2 centered_original_st = original_st - .5;
    vec2 mask_origin = vec2(-.7, -.2);
    vec2 mask_size = vec2(1.4, .4);
    float horizontal_mask = smoothrect(centered_original_st, mask_origin * max_scale, mask_size * max_scale);
    float vertical_mask = smoothrect(centered_original_st, mask_origin.yx * max_scale, mask_size.yx * max_scale);
    float intersection = horizontal_mask * vertical_mask;
    float mask_to_show = horizontal_mask + vertical_mask - intersection; // minus so that we don't overcount the intersection part
    color = mix(vec3(0.), color, mask_to_show);
    color = mix(color, vec3(1.), mask_to_show * time); // fade to white as we get to end of cycle

    outputColor = vec4(color, 1.0);
}
