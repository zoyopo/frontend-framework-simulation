/**
 * @title: index.js
 * @projectName frontend-framework-simulation
 * @description: TODO
 * @author zhangyunpeng0126
 * @date 2022/4/2017:47
 */

function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
// 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12:
            case 13:
// 110x xxxx 10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
// 1110 xxxx 10xx xxxx 10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}


const fetachHtml = (url) =>{
    fetch(url).then((response) => {
        const reader = response.body.getReader();
        const stream = new ReadableStream({
            start(controller) {
                // 下面的函数处理每个数据块
                function push() {
                    // "done"是一个布尔型，"value"是一个Uint8Array
                    reader.read().then(({done, value}) => {
                        if (value) {
                            const htmlStr = Utf8ArrayToStr(value)
                            console.log('value', htmlStr)
                            setHtmlStr(htmlStr)
                        }
                        // 判断是否还有可读的数据？
                        if (done) {
                            // 告诉浏览器已经结束数据发送
                            controller.close();
                            return;
                        }

                        // 取得数据并将它通过controller发送给浏览器
                        controller.enqueue(value);
                        push();
                    });
                };

                push();
            }
        });

        return new Response(stream, {headers: {"Content-Type": "text/html"}});
    });

}

