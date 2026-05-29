import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import CountUp from 'react-countup';

/**
 * Animated stat counter. Accepts the original display strings used across the
 * site ("500+", "98%", "₦350M+", "24/7", "End-to-End", ...). Numeric values
 * count up when scrolled into view; non-numeric values render as-is so no copy
 * is ever lost or mangled.
 */
function parseValue(value) {
  const str = String(value).trim();
  // Leading prefix (₦, $), the number (with separators/decimals), then suffix (+, %, K, M, /7…)
  const match = str.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
  if (!match) return { numeric: false, raw: str };
  const [, prefix, num, suffix] = match;
  const decimals = (num.split('.')[1] || '').length;
  return {
    numeric: true,
    prefix,
    suffix,
    end: parseFloat(num.replace(/,/g, '')),
    decimals,
    useGrouping: num.includes(','),
  };
}

export default function AnimatedCounter({ value, className = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const parsed = parseValue(value);

  return (
    <span ref={ref} className={className}>
      {parsed.numeric && inView ? (
        <CountUp
          end={parsed.end}
          duration={duration}
          decimals={parsed.decimals}
          prefix={parsed.prefix}
          suffix={parsed.suffix}
          useGrouping={parsed.useGrouping}
          separator=","
        />
      ) : parsed.numeric ? (
        // Reserve layout before reveal: show start state, not a flash of final value.
        <span>{`${parsed.prefix}0${parsed.suffix}`}</span>
      ) : (
        parsed.raw
      )}
    </span>
  );
}
