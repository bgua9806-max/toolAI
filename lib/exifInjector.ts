/**
 * EXIF Injector Module
 * Ghi đè thông số máy ảnh thực tế (Sony A7 IV, iPhone 15 Pro, Canon R5...) vào ảnh JPEG
 * 100% Binary Client-side qua ArrayBuffer mà không cần thư viện ngoài.
 */

export interface CameraPreset {
  id: string;
  name: string;
  brand: string;
  model: string;
  firmware: string;
  lens: string;
  aperture: number;       // Ví dụ 2.8 nghĩa là f/2.8
  shutterSpeedNum: number; // Tử số: 1
  shutterSpeedDen: number; // Mẫu số: 250 (1/250s)
  iso: number;            // 100
  focalLength: number;    // 50 (50mm)
  description: string;
}

export const CAMERA_PRESETS: Record<string, CameraPreset> = {
  'sony-a7m4': {
    id: 'sony-a7m4',
    name: 'Sony Alpha 7 IV + FE 24-70mm GM II',
    brand: 'Sony',
    model: 'ILCE-7M4',
    firmware: 'ILCE-7M4 Firmware v3.00',
    lens: 'FE 24-70mm F2.8 GM II',
    aperture: 2.8,
    shutterSpeedNum: 1,
    shutterSpeedDen: 250,
    iso: 100,
    focalLength: 50,
    description: 'Thiết bị: Sony ILCE-7M4 • Lens: FE 24-70mm F2.8 GM II • f/2.8, 1/250s, ISO 100',
  },
  'iphone-15-pro-max': {
    id: 'iphone-15-pro-max',
    name: 'Apple iPhone 15 Pro Max (24mm f/1.78)',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    firmware: 'iOS 17.5.1',
    lens: 'iPhone 15 Pro Max back triple camera 6.86mm f/1.78',
    aperture: 1.78,
    shutterSpeedNum: 1,
    shutterSpeedDen: 120,
    iso: 50,
    focalLength: 24,
    description: 'Thiết bị: Apple iPhone 15 Pro Max • Camera chính 24mm f/1.78 • 1/120s, ISO 50',
  },
  'canon-eos-r5': {
    id: 'canon-eos-r5',
    name: 'Canon EOS R5 + RF 50mm F1.2 L USM',
    brand: 'Canon',
    model: 'Canon EOS R5',
    firmware: 'Firmware Version 1.8.1',
    lens: 'RF50mm F1.2 L USM',
    aperture: 2.0,
    shutterSpeedNum: 1,
    shutterSpeedDen: 320,
    iso: 100,
    focalLength: 50,
    description: 'Thiết bị: Canon EOS R5 • Lens: RF 50mm F1.2 L USM • f/2.0, 1/320s, ISO 100',
  },
  'samsung-s24-ultra': {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra (23mm f/1.7)',
    brand: 'samsung',
    model: 'SM-S928B',
    firmware: 'S928BXXU1AXB5',
    lens: 'Samsung Galaxy S24 Ultra Main Camera',
    aperture: 1.7,
    shutterSpeedNum: 1,
    shutterSpeedDen: 200,
    iso: 64,
    focalLength: 23,
    description: 'Thiết bị: Samsung Galaxy S24 Ultra • f/1.7, 1/200s, ISO 64',
  },
  'fujifilm-xt5': {
    id: 'fujifilm-xt5',
    name: 'Fujifilm X-T5 + XF 35mm F1.4 R',
    brand: 'FUJIFILM',
    model: 'X-T5',
    firmware: 'Digital Camera X-T5 Ver.2.01',
    lens: 'XF35mmF1.4 R',
    aperture: 2.0,
    shutterSpeedNum: 1,
    shutterSpeedDen: 500,
    iso: 160,
    focalLength: 35,
    description: 'Thiết bị: Fujifilm X-T5 • Lens: XF 35mm F1.4 R • f/2.0, 1/500s, ISO 160',
  },
};

/**
 * Định dạng thời gian hiện tại theo chuẩn EXIF: "YYYY:MM:DD HH:MM:SS"
 */
function getExifDateString(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Tạo binary phân đoạn APP1 EXIF hoàn chỉnh cho ảnh JPEG
 */
export function buildExifApp1Segment(preset: CameraPreset): Uint8Array {
  const dateTimeStr = getExifDateString();
  const makeStr = preset.brand + '\0';
  const modelStr = preset.model + '\0';
  const softwareStr = preset.firmware + '\0';
  const dateStr = dateTimeStr + '\0';
  const lensStr = preset.lens + '\0';

  // Dùng Little Endian (II)
  const buffer = new ArrayBuffer(2048);
  const view = new DataView(buffer);
  let offset = 0;

  // 1. Exif Header: 'E', 'x', 'i', 'f', 0, 0
  view.setUint8(offset++, 0x45);
  view.setUint8(offset++, 0x78);
  view.setUint8(offset++, 0x69);
  view.setUint8(offset++, 0x66);
  view.setUint8(offset++, 0x00);
  view.setUint8(offset++, 0x00);

  const tiffStart = offset; // 6

  // 2. TIFF Header (Little Endian: II)
  view.setUint8(offset++, 0x49); // 'I'
  view.setUint8(offset++, 0x49); // 'I'
  view.setUint16(offset, 0x002A, true); offset += 2; // 42
  view.setUint32(offset, 0x00000008, true); offset += 4; // Offset tới IFD0 tính từ tiffStart (8 bytes)

  // 3. IFD0
  const ifd0Start = offset; // 14
  const ifd0EntryCount = 5; // Make, Model, Software, DateTime, ExifIFDPointer
  view.setUint16(offset, ifd0EntryCount, true); offset += 2;

  // Vùng data sau bảng entry IFD0:
  // tiffStart (6) + IFD0 offset (8) + 2 (count) + 5*12 (entries) + 4 (next pointer) = 80
  let dataOffset = (offset - tiffStart) + (ifd0EntryCount * 12) + 4;

  const writeStringData = (str: string): number => {
    const stringOffset = dataOffset;
    for (let i = 0; i < str.length; i++) {
      view.setUint8(tiffStart + dataOffset + i, str.charCodeAt(i));
    }
    dataOffset += str.length;
    if (dataOffset % 2 !== 0) dataOffset++; // Align 2 bytes
    return stringOffset;
  };

  const writeEntry = (tag: number, type: number, count: number, valueOrOffset: number) => {
    view.setUint16(offset, tag, true); offset += 2;
    view.setUint16(offset, type, true); offset += 2;
    view.setUint32(offset, count, true); offset += 4;
    view.setUint32(offset, valueOrOffset, true); offset += 4;
  };

  // Entry 1: Make (0x010F, ASCII=2)
  const makeOffset = writeStringData(makeStr);
  writeEntry(0x010F, 2, makeStr.length, makeOffset);

  // Entry 2: Model (0x0110, ASCII=2)
  const modelOffset = writeStringData(modelStr);
  writeEntry(0x0110, 2, modelStr.length, modelOffset);

  // Entry 3: Software (0x0131, ASCII=2)
  const softOffset = writeStringData(softwareStr);
  writeEntry(0x0131, 2, softwareStr.length, softOffset);

  // Entry 4: DateTime (0x0132, ASCII=2)
  const dateOffset = writeStringData(dateStr);
  writeEntry(0x0132, 2, dateStr.length, dateOffset);

  // Entry 5: ExifIFDPointer (0x8769, LONG=4, 1 count)
  const exifPointerEntryOffset = offset;
  writeEntry(0x8769, 4, 1, 0); // Sẽ ghi đè giá trị thật sau khi biết offset

  // Offset tới IFD kế tiếp (0 = không có)
  view.setUint32(offset, 0, true); offset += 4;

  // 4. SubIFD (ExifIFD)
  const subIfdOffset = dataOffset;
  view.setUint32(exifPointerEntryOffset + 8, subIfdOffset, true);

  offset = tiffStart + subIfdOffset;
  const subIfdEntryCount = 6;
  view.setUint16(offset, subIfdEntryCount, true); offset += 2;

  dataOffset = subIfdOffset + 2 + (subIfdEntryCount * 12) + 4;

  const writeRationalData = (num: number, den: number): number => {
    const rationalOffset = dataOffset;
    view.setUint32(tiffStart + dataOffset, num, true);
    view.setUint32(tiffStart + dataOffset + 4, den, true);
    dataOffset += 8;
    return rationalOffset;
  };

  // SubEntry 1: ExposureTime (0x829A, RATIONAL=5)
  const expOffset = writeRationalData(preset.shutterSpeedNum, preset.shutterSpeedDen);
  writeEntry(0x829A, 5, 1, expOffset);

  // SubEntry 2: FNumber (0x829D, RATIONAL=5)
  const fnumOffset = writeRationalData(Math.round(preset.aperture * 100), 100);
  writeEntry(0x829D, 5, 1, fnumOffset);

  // SubEntry 3: ISOSpeedRatings (0x8827, SHORT=3, count 1)
  writeEntry(0x8827, 3, 1, preset.iso);

  // SubEntry 4: DateTimeOriginal (0x9003, ASCII=2)
  const origDateOffset = writeStringData(dateStr);
  writeEntry(0x9003, 2, dateStr.length, origDateOffset);

  // SubEntry 5: FocalLength (0x920A, RATIONAL=5)
  const focalOffset = writeRationalData(preset.focalLength * 10, 10);
  writeEntry(0x920A, 5, 1, focalOffset);

  // SubEntry 6: LensModel (0xA434, ASCII=2)
  const lensOffset = writeStringData(lensStr);
  writeEntry(0xA434, 2, lensStr.length, lensOffset);

  // Next pointer
  view.setUint32(offset, 0, true); offset += 4;

  const totalExifLength = tiffStart + dataOffset;

  const segmentLength = totalExifLength + 2;
  const app1Segment = new Uint8Array(2 + segmentLength);
  app1Segment[0] = 0xFF;
  app1Segment[1] = 0xE1;
  app1Segment[2] = (segmentLength >> 8) & 0xFF;
  app1Segment[3] = segmentLength & 0xFF;
  app1Segment.set(new Uint8Array(buffer, 0, totalExifLength), 4);

  return app1Segment;
}

/**
 * Ghi đè phân đoạn APP1 EXIF vào JPEG Blob và bóc toàn bộ C2PA/JUMBF cũ
 */
export async function injectExifIntoJpeg(jpegBlob: Blob, presetKey: string): Promise<Blob> {
  const preset = CAMERA_PRESETS[presetKey] || CAMERA_PRESETS['sony-a7m4'];
  const app1Segment = buildExifApp1Segment(preset);

  const arrayBuffer = await jpegBlob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  if (bytes[0] !== 0xFF || bytes[1] !== 0xD8) {
    console.warn("File không phải JPEG chuẩn, trả về blob gốc.");
    return jpegBlob;
  }

  let offset = 2;
  const cleanChunks: Uint8Array[] = [];
  cleanChunks.push(bytes.subarray(0, 2)); // SOI: 0xFF 0xD8

  // Thêm APP1 mới ngay sau SOI
  cleanChunks.push(app1Segment);

  while (offset < bytes.length) {
    if (bytes[offset] === 0xFF) {
      const marker = bytes[offset + 1];
      
      // Nếu là SOS (0xDA) hoặc EOI (0xD9), kết thúc metadata header
      if (marker === 0xDA || marker === 0xD9) {
        cleanChunks.push(bytes.subarray(offset));
        break;
      }

      if (offset + 4 > bytes.length) {
        cleanChunks.push(bytes.subarray(offset));
        break;
      }

      const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
      const nextOffset = offset + 2 + length;

      // 0xE1 là APP1 (EXIF cũ), 0xEB là APP11 (C2PA / JUMBF box)
      // Loại bỏ hoàn toàn APP1 cũ và APP11 C2PA để đảm bảo bóc sạch dấu AI!
      if (marker === 0xE1 || marker === 0xEB) {
        offset = nextOffset;
        continue;
      }

      cleanChunks.push(bytes.subarray(offset, nextOffset));
      offset = nextOffset;
    } else {
      cleanChunks.push(bytes.subarray(offset));
      break;
    }
  }

  return new Blob(cleanChunks, { type: 'image/jpeg' });
}
