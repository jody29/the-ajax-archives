import format from 'date-fns/format';
import produce from 'immer';
import Router, { useRouter } from 'next/router';
import qs from 'qs';
import { useCallback } from 'react';

import yn from '../yn';

type Key = string;
type PossibleValue = boolean | string | Date | number | undefined;
type ReturnType<T> = [T, (value: T) => void];
type Options<PT, R> = {
  type?: PT;
  defaultValue?: R;
};

type PossibleOptions =
  | Options<ParamType.Boolean, boolean>
  | Options<ParamType.Date, Date | undefined>
  | Options<ParamType.Number, number | undefined>
  | Options<ParamType.String, string | undefined>;

interface QueryParamSetterConfig {
  [key: string]: PossibleValue;
}

interface QueryParamSetterValues {
  [key: string]: string;
}

export enum ParamType {
  String,
  Boolean,
  Number,
  Date,
}

function encodeValue(value: boolean | string | Date | number): string {
  switch (typeof value) {
    case 'string':
      return value;
    case 'number':
      return String(value);
    case 'boolean':
      return value ? '1' : '0';
    default:
      if (value instanceof Date) {
        return format(value, 'yyyy-MM-dd');
      }

      return String(value);
  }
}

function decodeValue(value: string, option: PossibleOptions) {
  const { type = ParamType.String, defaultValue } = option;

  switch (type) {
    case ParamType.Boolean:
      return yn(value);
    case ParamType.Number:
      return value ? Number(value) : defaultValue;
    case ParamType.Date:
      return value ? new Date(value) : defaultValue;
    default:
      return value ? String(value) : defaultValue;
  }
}

export function setQueryParams(values: QueryParamSetterConfig) {
  const { pathname, query, asPath } = Router;

  const newValues = produce(values, draftValues => {
    for (const [key, value] of Object.entries(draftValues)) {
      if (value !== undefined) {
        draftValues[key] = encodeValue(value);
      }
    }
  }) as QueryParamSetterValues;

  const newQuery = produce(query, draftQuery => {
    for (const [key, value] of Object.entries(newValues)) {
      if (value !== undefined) {
        draftQuery[key] = value;
      } else {
        delete draftQuery[key];
      }
    }
  });

  const params = qs.stringify(newQuery, {
    filter: (key, value) => {
      // filter out dynamic url params
      if (pathname.includes(`[${key}]`)) return;
      return value;
    },
  });
  const url = asPath.split('?')[0];
  const newAsPath = params ? `${url}?${params}` : url;

  Router.push(
    {
      pathname,
      query: newQuery,
    },
    newAsPath,
    {
      shallow: true,
      scroll: false,
    },
  );
}

export function setQueryParam(key: Key, value: PossibleValue) {
  setQueryParams({
    [key]: value,
  });
}

export const useSetQueryParam = (key: string) => {
  const callback = useCallback(
    (value: PossibleValue) => {
      return setQueryParam(key, value);
    },
    [key],
  );

  return callback;
};

export const useSetQueryParams = <T>(config: T) => {
  const callback = useCallback((values: { [key in keyof typeof config]?: PossibleValue }) => {
    return setQueryParams(values);
  }, []);

  return callback;
};

function useQueryParam(
  key: Key,
  options?: Options<ParamType.String, string | undefined>,
): ReturnType<string | undefined>;
function useQueryParam(
  key: Key,
  options?: Options<ParamType.Boolean, boolean>,
): ReturnType<boolean>;
function useQueryParam(
  key: Key,
  options?: Options<ParamType.Date, Date | undefined>,
): ReturnType<Date | undefined>;
function useQueryParam(
  key: Key,
  options?: Options<ParamType.Number, number | undefined>,
): ReturnType<number | undefined>;
function useQueryParam(
  key: Key,
  options:
    | Options<ParamType.Boolean, boolean>
    | Options<ParamType.Date, Date | undefined>
    | Options<ParamType.Number, number | undefined>
    | Options<ParamType.String, string | undefined> = {
    type: ParamType.String,
  },
):
  | ReturnType<boolean>
  | ReturnType<Date | undefined>
  | ReturnType<number | undefined>
  | ReturnType<string | undefined> {
  const value = useQueryParamValue(key, options as any);
  const setter = useSetQueryParam(key);

  return [value, setter];
}

function useQueryParamValue(
  key: Key,
  options?: Options<ParamType.String, string | undefined>,
): string | undefined;
function useQueryParamValue(key: Key, options?: Options<ParamType.Boolean, boolean>): boolean;
function useQueryParamValue(
  key: Key,
  options?: Options<ParamType.Date, Date | undefined>,
): Date | undefined;
function useQueryParamValue(
  key: Key,
  options?: Options<ParamType.Number, number | undefined>,
): number | undefined;
function useQueryParamValue(
  key: Key,
  options: PossibleOptions = {
    type: ParamType.String,
  },
): boolean | string | number | Date | undefined {
  const router = useRouter();
  const value = (router.query[key] as unknown) as any;
  return decodeValue(value, options);
}

export const useQueryParams = <T>(
  config: { [key in keyof T]: PossibleOptions },
): [
  { [key in keyof T]?: PossibleValue },
  (values: { [key in keyof T]?: PossibleValue }) => void,
] => {
  const values = useQueryParamValues(config);
  const setter = useSetQueryParams(config);
  return [values, setter];
};

export const useQueryParamValues = <T>(config: T) => {
  const router = useRouter();
  const keys = Object.keys(config) as Array<keyof T>;

  const values = keys.reduce((obj, key) => {
    const value = (router.query[key as string] as unknown) as any;
    const option = config[key];
    obj[key] = decodeValue(value, option);
    return obj;
  }, {} as { [key in keyof typeof config]?: PossibleValue });

  return values;
};

export { useQueryParam, useQueryParamValue };
