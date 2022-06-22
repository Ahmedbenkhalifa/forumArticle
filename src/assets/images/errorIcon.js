import * as React from "react"
import "./style.css";

const SvgComponent = (props) => (
  <svg viewBox="0 0 87 87" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(2 2)" fill="none" fillRule="evenodd">
      <circle
        stroke="rgba(252, 191, 191, .5)"
        strokeWidth={4}
        cx={41.5}
        cy={41.5}
        r={41.5}
      />
      <circle
        className="ui-error-circle"
        stroke="#F74444"
        strokeWidth={4}
        cx={41.5}
        cy={41.5}
        r={41.5}
      />
      <path
        className="ui-error-line1"
        d="m22.244 22 38.184 38.184"
        stroke="#F74444"
        strokeWidth={3}
        strokeLinecap="square"
      />
      <path
        className="ui-error-line2"
        d="M60.756 21 23.244 59.844"
        stroke="#F74444"
        strokeWidth={3}
        strokeLinecap="square"
      />
    </g>
  </svg>
)

export default SvgComponent
