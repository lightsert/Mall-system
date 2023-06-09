// 支付宝SDK 配置
const AlipaySdk = require('alipay-sdk').default
// const fs = require('fs')
// 普通公钥模式
let alipaySdk = new AlipaySdk({
    // 参考下方 SDK 配置
    appId: '2021000122669231',
    // 应用私钥
    privateKey: 'MIIEowIBAAKCAQEAhTwu+iRCR+FCL8AsKorLUPXKMxxAy0hjVVctBcotzAwx4/ve61iZWJfMujQ/0ySndRBEXO0gPLDi/D10uW+dvFgHEKrnTdr6BkKeXJQn0585GQcMxJghSzpWtnHz3PEXChgSujcny2aj5ULGA2AIbt9FCsI54rkHDzlnGtMc9yh+pls+FwDhJWXCSJrnFBzEAmMS5ELv62OvQR160cOtAjnBfgGIsl+cJ2Kr6cZfYmHgN1I0kf/5r3wjg4xU1HtEZjhVP0Xx8FEoSqhurinNoZdNoehPmPuhK0vsoR3MSTcgVgdznxyqbazEponjJo/k/UUNViSCHpUEQZK8SRrFZQIDAQABAoIBAAaY1UajdviyKaHNpSIyHyESGoHvWzH1kp2OJHeN7DiXPf0o4n/KskUVtxhdL+/Xd8cvGAN15ku7AnI05MutwCSsQyVLIQrU1d5rfAXffB1ZW+1mUPaHBdcAu3xrJgUBlv9z87Fuu7Sxj1nxtXZDUgeTXIrM1SrpuHTDhdxpKZz/PC14ba71Qp3+yYEks1QNR2NBM6ODmBMOduvz2JpWwcWbD/Ng28JwJK26MKn8AgYCGFboSQQcIrCoRxv3NndB78UGo3gwsQKxpDSAmLC64FlSjGUgUGwRXaUTO4Xwa/mojG6u3jX28Ewjv3qg9KyY1br+p0+ZAHrETorWQt6WHMECgYEA+bY9vmiyGb6POICNziLjdlvd1DYvdlG3dSmGoQ/5fe4vQ6fpXfFPbQJqaadWuQY3KBbhWaX0DYprZ3epWV9PI4ZNlPN1bCJRN+ZFK0nrYhm2vyDkqjZMX48gDeKnfL+abYyCutPVEpGDz96Wn/MLJ5sLDfU0gJ3bbZ938qw3ILECgYEAiJcULXJGw/1AIh/rS4fbY4o7LMtTfNzEIesxMhmRDvDyn2iwLaZTtI8CU3GjevgLm+I5y6o9ZxKbhYOJzUUEcb2RQAiWSRt/byhyUO9ctTLri3Pw/A5eBYoddv1DbtnNchQgENljqFeKku1PYgD9Bakyovpa5YPRi/i99NtfPPUCgYEAlZUfY2If3eAStwv65hJsI0hgl3Bl+gB1Xw+i//Qrxc3aLjL1TjrxEyGxUNzWzDr262LZVvRcP4g9UluR7GF1bJhU/Pbhzga4lD2yDX5YLAmvOMqhb3zbPxrjXq35GndEMH9NCFFAf8D/LpPtsp7Kfc0YUCIkcy8cdIxkM9AJreECgYA5+a5Fz/B7db3H/jZX+9VB/cU6MR9Bq07QesyJ0FJCvkCtKrlE1wlGZUD+fAiAxFHhG3eem6auXjaGyBswdm/5exXw0PRBGZvQaaGD+uUlv/Q8X7zUr6B2x3XUMJFztpy+JA6sOClVpbqavIFqPrMmuPdWN99m9bl2qOCv0oEtFQKBgFsUbCa3F9aQ1prQld1gXKhaWjEF954mz6kBEXSWmzzkrJKRewaPMvATVDwgTr9jA3YXDphDjeJCf0D2xrelWbx/Ev9Oel2AdztcWldd1yHqsFSzMQ9aAoAV1QMfYyPTBOMrriWu/oYlPhh9uLAh1OcQUuMplMtjp4DbA/197SQ9',
    //支付宝公钥
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoFOuDE46RwAvcmIS/pEyxHD++3ksx3L8F1jjV1d3qbqhDAZrBrqugZ86SgofuyAZxBH5+/vClEx25UPzGW5Z3+p5f/qg9GCvZm65czsO6+ATbiCOZLqnGuIipmOuKt3MdPo6cXPqrkML455FrGsgvOUcnwJR7sCzhTe9C0ZHmrqHR08Wqre0C6C4XmVNcXzC/IhRnlYzFLLVjr/xtpKRSSAb5VWYHjtYWxXukD5UYPSBbG+i3IOT09RDvj3A6LJD/7an1glj+GgfT2a8qJJNLAKy3kq4DavIJV3tlXHEeLXyGOKDD0W8iEAT24/hGvCw31Aexp/s6A8lJTRXeI6OtQIDAQAB',
    gateway:'https://openapi.alipaydev.com/gateway.do',
    // signType:'RSA2'
});

module.exports = alipaySdk