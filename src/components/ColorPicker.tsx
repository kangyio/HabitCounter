import Circle from "@uiw/react-color-circle";

interface ColorPickerProps {
  hex: string;
  setHex: React.Dispatch<React.SetStateAction<string>>;
}

export function ColorPicker({ hex, setHex }: ColorPickerProps) {
  return (
    <Circle
      colors={["#F44E3B", "#FE9200", "#FCDC00", "#DBDF00"]}
      color={hex}
      onChange={color => {
        setHex(color.hex);
      }}
    />
  );
}
