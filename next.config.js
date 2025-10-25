module.exports = {
    basePath: '/cvkader',
    async redirects() {
        return [{ source: '/', destination: '/cvkader', permanent: false }];
    },
};