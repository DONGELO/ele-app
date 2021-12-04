/*
 *
 */
export function validator(val){
    let reg = /^[a-z0-9]{6}$/
    return !reg.test(value) ? true : false;
}

/*
 *
 */
export function asyncValidator(val){
    return new Promise((resolve) => {
        root.Toast.loading('验证中...');

        setTimeout(() => {
        root.Toast.clear();
        resolve(/\d{6}/.test(val));
        }, 1000);
    });
}