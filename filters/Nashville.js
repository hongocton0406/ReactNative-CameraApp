import { GLSL, Node, Shaders } from "gl-react";
import PropTypes from "prop-types";
import React from "react";

const shaders = Shaders.create({
    Nashville: {
        frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .83333)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .16666)).b);
        gl_FragColor = vec4(texel, 1.0);
      }`,
    },
});

const Nashville = ({ children: t }) => {
    return (
        <Node
            shader={shaders.Nashville}
            uniforms={{
                inputImageTexture: t,
                inputImageTexture2: require("../resources/nashvilleMap.png"),
            }}
        />
    );
};

Nashville.propTypes = {
    children: PropTypes.object.isRequired,
};

export default Nashville;
