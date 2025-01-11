import * as React from 'react'

import type { TextInputDOMProps } from '@react-types/shared'
import {
	Button as ButtonPrimitive,
	TextField as TextFieldPrimitive,
	type TextFieldProps as TextFieldPrimitiveProps,
} from 'react-aria-components'

import {
	type FieldProps,
	Description,
	FieldError,
	FieldGroup,
	fieldGroupPrefixStyles,
	Input,
	Label,
} from './field'
// import { Icon } from '../Icon'
import { ctr } from './primitive'

type InputType = Exclude<TextInputDOMProps['type'], 'password'>

interface BaseTextFieldProps extends TextFieldPrimitiveProps, FieldProps {
	prefix?: React.ReactNode
	suffix?: React.ReactNode
	isLoading?: boolean
	indicatorPlace?: 'prefix' | 'suffix'
	className?: string
}

interface RevealableTextFieldProps extends BaseTextFieldProps {
	isRevealable: true
	type: 'password'
}

interface NonRevealableTextFieldProps extends BaseTextFieldProps {
	isRevealable?: never
	type?: InputType
}

type TextFieldProps = RevealableTextFieldProps | NonRevealableTextFieldProps

const TextField = ({
	placeholder,
	label,
	description,
	errorMessage,
	prefix,
	suffix,
	isLoading,
	indicatorPlace,
	className,
	isRevealable,
	type,
	...props
}: TextFieldProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
	const inputType = isRevealable
		? isPasswordVisible
			? 'text'
			: 'password'
		: type

	const handleTogglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev)
	}
	return (
		<TextFieldPrimitive
			type={inputType}
			{...props}
			className={ctr(className, 'group flex flex-col gap-1')}
		>
			{label && <Label>{label}</Label>}
			<FieldGroup
				data-loading={isLoading ? 'true' : undefined}
				className={fieldGroupPrefixStyles({ className })}
			>
				<Input className="px-2.5" placeholder={placeholder} />
				<ButtonPrimitive
					type="button"
					onPress={handleTogglePasswordVisibility}
					className="atrs isSfx x2e2 relative rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-primary [&_[data-slot=icon]]:text-muted-fg"
				>
					{/* <>
              {isPasswordVisible ? (
                <Icon name="eye-off" className="h-5 w-5 transition animate-in" />
              ) : (
                <Icon name="eye" className="h-5 w-5 transition animate-in" />
              )}
            </> */}
				</ButtonPrimitive>
			</FieldGroup>
			{description && <Description>{description}</Description>}
			<FieldError>{errorMessage}</FieldError>
		</TextFieldPrimitive>
	)
}

export { TextField, TextFieldPrimitive, type TextFieldProps }
