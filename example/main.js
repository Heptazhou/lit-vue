import { defineComponent, html, onMounted, onUnmounted, onUpdated, reactive } from "/index.js"

defineComponent("custom-root", () => {
	const state = reactive({
		show: true,
		text: "hello",
		data: { text: "world" },
	})
	const toggle = () => (state.show = !state.show)
	const onInput = (e) => (state.text = e.target.value)

	return () => html`
		<button @click=${toggle}>toggle child</button>
		<p><input value=${state.text} @input=${onInput} /></p>
		${state.show
			? html`
					<custom-child msg=${state.text} .data=${state.data}></custom-child>
			  `
			: ``}
	`
})

defineComponent("custom-child", ["msg", "data"], (props) => {
	const state = reactive({ count: 0 })
	const increase = () => state.count++
	onMounted(() => console.log("child mounted"))
	onUpdated(() => console.log("child updated"))
	onUnmounted(() => console.log("child unmounted"))

	return () =>
		html`
			<p>${props.msg}</p>
			<p>${props.data?.text}</p>
			<p>${state.count}</p>
			<button @click=${increase}>increase</button>
		`
})
