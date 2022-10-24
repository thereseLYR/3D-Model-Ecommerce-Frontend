import { keyframes } from "@chakra-ui/react";
const slide = keyframes`
    0%{
        transform: translateX(0%);
    }
    5%{
        transform: translateX(0%);
    }
    10%{
        transform: translateX(-10%);
    }
    15%{
        transform: translateX(-10%);
    }
    20%{
        transform: translateX(-20%);
    }
    25%{
        transform: translateX(-20%);
    }
    30%{
        transform: translateX(-30%);
    }
    35%{
        transform: translateX(-30%);
    }
    40%{
        transform: translateX(-40%);
    }
    45%{
        transform: translateX(-40%);
    }
    50%{
        transform: translateX(-50%);
    }
    55%{
        transform: translateX(-50%);
    }
    60%{
        transform: translateX(-60%);
    }
    65%{
        transform: translateX(-60%);
    }
    70%{
        transform: translateX(-70%);
    }
    75%{
        transform: translateX(-70%);
    }
    80%{
        transform: translateX(-80%);
    }
    85%{
        transform: translateX(-80%);
    }
    90%{
        transform: translateX(-90%);
    }
    95%{
        transform: translateX(-90%);
    }
    100%{
        transform: translateX(-100%);
    }
  `;

export default function SlideAnimation() {
  return `${slide} infinite 25s`;
}
