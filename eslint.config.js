import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import pluginOxlint from 'eslint-plugin-oxlint';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
// 👇 Agregar anotación de tipo explícita
const config = defineConfigWithVueTs({
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
}, globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']), pluginVue.configs['flat/essential'], vueTsConfigs.recommended, {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
}, ...pluginOxlint.configs['flat/recommended'], skipFormatting, {
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
    },
});
export default config;
