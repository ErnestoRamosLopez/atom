import styled from 'styled-components';

interface ScaleProps {
  scale?: number,
  transition?: number
}

// Create a styled component that takes 'scale' as a prop
const ScalableDiv = styled.div<ScaleProps>`
  transition: transform ${({transition}) => transition}s ease; // Optional: Add some transition for smooth scaling

  &:hover{
    transform: ${({ scale }) => `scale(${scale})`};
  }
`;

ScalableDiv.defaultProps = {
  scale: 1.3,
  transition: 0.3
}

export default ScalableDiv;