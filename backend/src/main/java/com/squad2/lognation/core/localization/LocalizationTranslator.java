package com.squad2.lognation.core.localization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Locale;

@Component
public class LocalizationTranslator {

    private static final String UNKNOWN_MSG_CODE = "M10001";

    private static ResourceBundleMessageSource messageSource;

    @Autowired
    public LocalizationTranslator(ResourceBundleMessageSource messageSource) {
        LocalizationTranslator.messageSource = messageSource;
    }

    public static String toLocale(String code) {
        return toLocale(code, null);
    }

    public static String toLocale(String code, List<String> params) {
        Locale locale = LocaleContextHolder.getLocale();
        Object[] arrayParams = null;
        if (params != null) {
            arrayParams = params.toArray();
        }
        String msg = messageSource.getMessage(code, arrayParams, "", locale);
        if (StringUtils.isEmpty(msg)) {
            msg = messageSource.getMessage(UNKNOWN_MSG_CODE, new Object[] {code}, locale);
        }
        return msg;
    }

}
