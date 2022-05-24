<script setup lang="ts">

</script>

<template>
  <div class="w-100% h-100%">
    <SplitViewContainer mode="horizontal">
      <SplitView>
        <SplitViewContainer mode="vertical">
          <SplitView>
            <SplitViewContainer mode="horizontal">
              <SplitView>1</SplitView>
              <SplitView>2</SplitView>
              <SplitView>3</SplitView>
              <SplitView>4</SplitView>
            </SplitViewContainer>
          </SplitView>
          <SplitView>
            2
          </SplitView>
        </SplitViewContainer>
      </SplitView>
      <SplitView>right</SplitView>
    </SplitViewContainer>
  </div>
</template>

<style scoped lang="less">

</style>
