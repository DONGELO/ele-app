<template>
    <div class="rating_gray">
        <svg-icon data_iconName="praise"></svg-icon>
        <svg-icon data_iconName="praise"></svg-icon>
        <svg-icon data_iconName="praise"></svg-icon>
        <svg-icon data_iconName="praise"></svg-icon>
    </div>
</template> 

<script>
export default {
    name: 'Rating',
    props: {
        rating: Number
    }
}
</script>

<style lang="scss" scoped>
    .rating_gray{
        margin-right: 1.066667vw;
        color: #ffbe00;
        display: inline-block;
    }
</style>