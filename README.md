# telescope

## Install

1. Clone this repository
2. `yarn start`

## Start server

```
yarn start
```

The server will start running on port 3000.

## Screenshot

Generate screenshots by passing the parameters to the endpoint:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `url`     | The URL of the image or resource to process. | **Required** |
| `width`   | The desired width of the output image. | `1280` |
| `height`  | The desired height of the output image. | `800` |
| `dpi` (integers only)     | The dots per inch (DPI) setting for the output image. | `1` |

### Example
```
http://localhost:3000?url=https://quartzo.studio&w=1280&h=640&dpi=2
```

#### Result
![image](https://github.com/user-attachments/assets/7be06d2d-9c0c-4dd8-8ae2-d9b648b77f9d)


