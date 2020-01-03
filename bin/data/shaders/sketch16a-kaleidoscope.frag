#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_variableA;

out vec4 outputColor;

#define PI 3.14159265359
#define TWO_PI (2 * PI)

vec2 st = gl_FragCoord.xy/u_bounds.xy;
float normalizer = u_bounds.x/u_bounds.y;


// origin is from bottom left
float smoothrect(in vec2 st, in vec2 origin, in vec2 size) {
    float eps = .001;
    float left = smoothstep(origin.x - eps, origin.x + eps, st.x);
    float bottom = smoothstep(origin.y - eps, origin.y + eps, st.y);
    float right = smoothstep(origin.x + size.x - eps, origin.x + size.x + eps, st.x) * -1. + 1.;
    float top = smoothstep(origin.y + size.y - eps, origin.y + size.y + eps, st.y) * -1. + 1.;
    return left * bottom * right * top;
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

void main() {

    // this line normalizes the x, if it is larger than y.
    st.x *= normalizer;
    vec3 color = vec3(0.0);

    st = tile(st, 10);

    vec2 original_st = st;

    st -= 0.5; // normalize coordinates so that rotation works properly

    vec2 uv = step(vec2(.1, .1), original_st) * (1 - step(vec2(.9, .9), original_st));
    float mask = uv.x * uv.y;

    mat2 rotationMatrix1 = rotate2d(sin(u_time) * PI * 0.5);
    mat2 rotationMatrix2 = rotate2d(u_time * 0.5);
    st = mix(rotationMatrix1 * st,  rotationMatrix2 * st, mask);

    color = vec3(st.x + 0.5,st.y + 0.5,0.5);

    vec2 origin = vec2(-.5,-.2);
    vec2 size = vec2(1., .4);
    color = mix(color, vec3(1.), smoothrect(st, origin, size));
    color = mix(color, vec3(1.), smoothrect(st, origin.yx, size.yx));

    outputColor = vec4(color, 1.0);
}
