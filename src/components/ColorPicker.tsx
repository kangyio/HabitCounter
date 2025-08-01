import Circle from "@uiw/react-color-circle";

interface ColorPickerProps {
  hex: string;
  setHex: React.Dispatch<React.SetStateAction<string>>;
}

export function ColorPicker({ hex, setHex }: ColorPickerProps) {
  return (
    <Circle
      colors={[
        "#F44336",
        "#FF5722",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#00BCD4",
        "#607D8B",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFC107",
        "#FF9800",
        "#795548"
      ]}
      color={hex}
      onChange={color => {
        setHex(color.hex);
        console.log(color.hex);
      }}
    />
  );
}
