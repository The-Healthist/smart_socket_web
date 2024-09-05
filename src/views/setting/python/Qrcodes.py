import json
import uuid
import pandas as pd
import os
import qrcode

def generate_unique_uuid():
    return str(uuid.uuid4())  # 生成唯一的 UUID

def generate_urls_with_prefix(prefix, count):
    urls = []

    # 根据指定数量生成网址
    for _ in range(count):
        unique_uuid = generate_unique_uuid()
        urls.append(f'{prefix}{unique_uuid}')

    return urls

def generate_qr_codes(urls):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    qr_codes_dir = os.path.join(script_dir, 'qrcodes')
    
    # 创建目录（如果不存在的话）
    if not os.path.exists(qr_codes_dir):
        os.makedirs(qr_codes_dir)
    
    for idx, url in enumerate(urls):
        # 生成二维码
        qr = qrcode.QRCode(version=1, box_size=10, border=4)
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')
        
        # 保存二维码图片
        qr_code_file_path = os.path.join(qr_codes_dir, f'qrcode_{idx + 1}.png')

        img.save(qr_code_file_path)
        print(f'二维码已保存为 {qr_code_file_path}')

def write_to_file(urls):
    try:
        # 获取当前脚本的目录W
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # 写入 JSON 文件
        json_file_path = os.path.join(script_dir, 'url.json')
        with open(json_file_path, 'w') as file:
            json.dump(urls, file, indent=2)

        # 转换为 DataFrame 并写入 Excel 文件
        excel_file_path = os.path.join(script_dir, 'urls.xlsx')
        df = pd.DataFrame(urls, columns=['URL'])
        df.to_excel(excel_file_path, index=False)

        print(f'网址已生成并写入 {json_file_path} 和 {excel_file_path}')
    except Exception as e:
        print(f'发生错误: {e}')

# 示例用法
def main():
    # 生成 50 个以 https://192.168.1.11:5173/#/payDetail/ 开头的网址
    prefix1 = 'https://192.168.1.11:5173/#/payDetail/'
    urls1 = generate_urls_with_prefix(prefix1, 25)

    # 生成 50 个以 https://localhost:5173/#/payDetail/ 开头的网址
    prefix2 = 'https://localhost:5173/#/payDetail/'
    urls2 = generate_urls_with_prefix(prefix2, 25)

    # 合并两个网址列表
    all_urls = urls1 + urls2

    # 生成二维码
    generate_qr_codes(all_urls)

    # 写入文件
    write_to_file(all_urls)

# 执行脚本
if __name__ == '__main__':
    main()
