function generateNewPassword() {
    const novaSenha = (Math.random() + 1)
    .toString(36)
    .substring(2)
    .replace("j","@")
    .replace("r","$")
    .replace("5","*")
    .replace("y","#")
    return novaSenha;
}

export {generateNewPassword};