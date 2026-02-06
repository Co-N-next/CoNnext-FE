import { Typography as T } from '../../styles/tokens/typography';


interface Props {
variant: keyof typeof T;
highlight?: boolean;
children: React.ReactNode;
}


export function Text({ variant, highlight, children }: Props) {
const style = T[variant];


return (
<span
style={{
fontSize: style.fontSize,
fontWeight: style.fontWeight,
fontFamily: highlight ? 'YdeStreet' : 'Pretendard',
}}
>
{children}
</span>
);
}