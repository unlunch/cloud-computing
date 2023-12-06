const validatePhoneNumber = (phoneNumber) => {
    // Format nomor telepon Indonesia yang diizinkan: +62 diikuti oleh 9 hingga 15 digit
    const regex = /^\+62\s?(\d{3,4}){1,4}\s?\d{4,5}\s?\d{4}$/;

    // Hilangkan spasi tambahan dari nomor telepon
    const trimmedPhoneNumber = phoneNumber.replace(/\s+/g, '');

    // Lakukan validasi dengan regex
    return regex.test(trimmedPhoneNumber);
}

export {
    validatePhoneNumber
}