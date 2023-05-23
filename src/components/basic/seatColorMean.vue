<template>
    <div class=' bg-white  text-sm  rounded-md shadow-round'>
        <ul>
            <li>
                <el-icon>
                    <UserFilled />
                </el-icon>
                可自由预约时间
            </li>
            <br />
            <li>
                <el-icon class="notFullOrdered">
                    <UserFilled />
                </el-icon>
                仍可预约其他时间
            </li>
            <br />
            <li>
                <el-icon class="fullOrdered">
                    <UserFilled />
                </el-icon>
                预约已满
            </li>
        </ul>
    </div>
</template>
<style scoped lang='less'>
.fullOrdered {
    color: #9d1d22;
}

.notFullOrdered {
    color: rgb(249, 192, 6);
}
</style>