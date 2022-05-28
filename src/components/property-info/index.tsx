import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { buildingCategory } from "./building-category.const";

interface ContentType {
  address: string;
  category: string;
}

interface PropertyInfoProps {
  content: ContentType;
  onChange: (content: ContentType) => void;
}

const PropertyInfo = ({ content, onChange }: PropertyInfoProps) => {
  return (
    <>
      <h1>매물 정보</h1>
      <Divider />
      <FormControl sx={{ m: 1, minWidth: 120, display: "block" }} size="small">
        <TextField
          label="매물 주소"
          id="standard-start-adornment"
          sx={{ m: 0.5, width: "25ch", height: "5ch" }}
          variant="standard"
          value={content.address}
          onChange={(e) => onChange({ ...content, address: e.target.value })}
        />
      </FormControl>

      <FormControl sx={{ m: 1, marginTop: 4, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">매물 분류</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={content.category}
          label="매물 분류"
          onChange={(e) => onChange({ ...content, category: e.target.value })}
        >
          {Object.keys(buildingCategory).map((item: string, index: number) => (
            <MenuItem key={index} value={item}>
              {buildingCategory[item]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider sx={{ marginTop: 2 }} />
    </>
  );
};

export default PropertyInfo;
