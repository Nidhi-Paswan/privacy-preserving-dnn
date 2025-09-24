from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64

KEY = b"this_is_16bytek1" 
IV = b"this_is_16byteiv" 

def encrypt_image(img_bytes):
    cipher = AES.new(KEY, AES.MODE_CBC, IV)
    padded = pad(img_bytes, AES.block_size)
    encrypted = cipher.encrypt(padded)
    return base64.b64encode(encrypted).decode('utf-8')

def decrypt_image(enc_b64_str):
    encrypted_bytes = base64.b64decode(enc_b64_str)
    cipher = AES.new(KEY, AES.MODE_CBC, IV)
    decrypted = unpad(cipher.decrypt(encrypted_bytes), AES.block_size)
    return decrypted
