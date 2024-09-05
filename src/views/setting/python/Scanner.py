import serial
import uuid
import hashlib

def generate_uuid_from_data(data):
    # 使用数据的哈希值生成 UUID
    hash_digest = hashlib.md5(data.encode('utf-8')).hexdigest()
    return str(uuid.uuid5(uuid.NAMESPACE_DNS, hash_digest))

def main():
    # 配置串口
    ser = serial.Serial('COM3', 115200, timeout=0.1)  # 使用较小的 timeout 以便于实时读取

    print(f'使用的串口: {ser.name}')  # 检查使用的串口

    try:
        while True:
            if ser.in_waiting > 0:  # 检查是否有数据可读
                data = ser.readline().decode('utf-8').strip()  # 读取一行数据
                if data.startswith('https://'):  # 如果数据是网址
                    print(f'扫描到的网址: {data}')
                    uuid_value = generate_uuid_from_data(data)  # 生成基于网址的 UUID
                    print(f'生成的 UUID: {uuid_value}')
                    # send_to_backend(uuid_value)  # 如果需要，可以发送 UUID 到后端
    except KeyboardInterrupt:
        print('程序终止')
    finally:
        ser.close()  # 关闭串口

if __name__ == '__main__':
    main()
