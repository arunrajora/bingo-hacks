import Openchain_pb2
import binascii   
from hashlib import sha256
from ecdsa import SigningKey, NIST384p
import ecdsa

product=Openchain_pb2.Mutation()
product.namespace=b"http://app.finocial.org/"
key=product.SerializeToString()
print(binascii.hexlify(key))
sig_pub=""
sig_pri=""
sig_hash=""
 
d=sha256(key)
d2=sha256()
d.hexdigest()
d2.update(d.digest())
sig_hash=d2.hexdigest()
sk = SigningKey.generate(curve=ecdsa.SECP256k1)
vk = sk.get_verifying_key()
sig = sk.sign(key)
print(binascii.hexlify(sig))
encr=sig
#print(vk.to_pem())
print(binascii.hexlify(vk.to_pem()))
