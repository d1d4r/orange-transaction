<script lang="ts">
	import { onMount } from 'svelte';

	// Props for timeline data
	export let years = [
		'1993',
		'1994',
		'1995',
		'1996',
		'1997',
		'1998',
		'1999',
		'2000',
		'2001',
		'2002',
		'2003',
		'2004',
		'2005',
		'2006',
		'2007',
		'2008',
		'2009',
		'2010',
		'2011',
		'2012',
		'2013',
		'2014',
		'2015',
		'2016',
		'2017',
		'2018'
	];

	// New prop for content
	export let content = years.map((year) => ({
		year,
		paragraphs: [
			'Default content paragraph 1',
			'Default content paragraph 2',
			'Default content paragraph 3'
		]
	}));

	let timeline: HTMLElement;
	let activeIndex = 0;
	let isFixed = false;
	let timelineTop = 190;
	let stickyTop = 0;
	let scrollTarget = false;
	let contentWrapper: HTMLElement;
	let lastScrollTop = 0;

	const TIMELINE_VALUES = {
		start: 190,
		step: 30
	};

	onMount(() => {
		const updateStickyTop = () => {
			const offsetTop = parseInt(getComputedStyle(timeline).top);
			stickyTop = timeline.getBoundingClientRect().top + window.pageYOffset - offsetTop;
		};

		const handleScroll = () => {
			// Update fixed state
			isFixed = window.pageYOffset > stickyTop;

			if (scrollTarget === false) {
				// Calculate scroll direction
				const currentScrollTop = window.pageYOffset;
				const scrollingDown = currentScrollTop > lastScrollTop;
				lastScrollTop = currentScrollTop;

				// Calculate the position relative to viewport center
				const wrapperRect = contentWrapper.getBoundingClientRect();
				const windowHeight = window.innerHeight;
				const centerThreshold = windowHeight / 3;

				// If scrolling down and content is above center, increment activeIndex
				if (scrollingDown && wrapperRect.top < centerThreshold && activeIndex < years.length - 1) {
					activeIndex++;
				}
				// If scrolling up and content is below center, decrement activeIndex
				else if (
					!scrollingDown &&
					wrapperRect.bottom > windowHeight - centerThreshold &&
					activeIndex > 0
				) {
					activeIndex--;
				}

				timelineTop = -1 * activeIndex * TIMELINE_VALUES.step + TIMELINE_VALUES.start;
			}
		};

		// Initial setup
		updateStickyTop();
		handleScroll();

		// Add event listeners
		window.addEventListener('resize', () => {
			isFixed = false;
			updateStickyTop();
			handleScroll();
		});

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('resize', updateStickyTop);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function handleYearClick(index: any) {
		if (index !== activeIndex) {
			scrollTarget = index;

			window.scrollTo({
				top: contentWrapper.offsetTop - 100,
				behavior: 'smooth'
			});

			setTimeout(() => {
				scrollTarget = false;
				activeIndex = index;
			}, 400);
		}
	}
</script>

<article class="timeline">
	<nav
		class="timeline__nav"
		class:fixed={isFixed}
		bind:this={timeline}
		style="top: {isFixed ? timelineTop + 'px' : '0'}"
	>
		<ul>
			{#each years as year, i}
				<li class:active={i === activeIndex}>
					<span on:click={() => handleYearClick(i)}>{year}</span>
				</li>
			{/each}
		</ul>
	</nav>

	<section class="timeline__section">
		<div class="wrapper" bind:this={contentWrapper}>
			<div class="content-container">
				<div class="milestone-content" class:active={true}>
					<h2 class="milestone">{content[activeIndex].year}</h2>
					{#each content[activeIndex].paragraphs as paragraph}
						<p class="fade-in">{paragraph}</p>
					{/each}
				</div>
			</div>
		</div>
	</section>
</article>

<style>
	@import url('https://fonts.googleapis.com/css?family=Exo+2:400,700&subset=cyrillic');

	:global(html) {
		box-sizing: border-box;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: inherit;
	}

	:global(body) {
		font-family: 'Exo 2', sans-serif;
		line-height: 1.5;
	}

	.wrapper {
		margin: 0 auto;
		padding: 0 16.66% 50px;
		width: 100%;
		min-height: 100vh; /* Make each section full viewport height */
	}

	.timeline {
		position: relative;
		max-width: 980px;
		margin: 0 auto;
	}

	.timeline__nav {
		position: fixed;
		z-index: 99;
		top: 0;
		transition: top 0.3s ease-out;
	}

	.timeline__nav ul {
		list-style: none;
		list-style-position: inside;
		margin: 15px 0;
	}

	.timeline__nav li {
		margin: 15px 0;
		padding-left: 0;
		list-style-type: none;
		color: #bfc1c3;
		border-bottom: 1px dotted rgba(0, 0, 0, 0.3);
		cursor: pointer;
		transition: all 0.3s ease-out;
	}

	.timeline__nav li.active {
		font-weight: bold;
		color: #f94125;
		border-bottom: 1px dotted transparent;
		transform: scale(1.2);
	}

	.timeline__nav li:hover {
		color: #000;
	}

	.content-container {
		min-height: 50vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.milestone-content {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.3s ease-out,
			transform 0.3s ease-out;
		width: 100%;
	}

	.milestone-content.active {
		opacity: 1;
		transform: translateY(0);
	}

	.fade-in {
		animation: fadeIn 0.5s ease-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
